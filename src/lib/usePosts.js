import { useEffect, useState } from 'react'
import { posts as staticPosts } from './content'

// The blog reads from the database (/api/posts). When the API is unreachable or
// has no published posts yet, we fall back to the bundled demo posts so the page
// is never empty. Admin-created posts, once published, take over automatically.

function normalize(row) {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category || 'Journal',
    excerpt: row.excerpt || '',
    date: row.published_at || row.created_at || row.updated_at || null,
    cover_url: row.cover_url || null,
    body: row.body ?? '',
    author: row.author || 'Ashok Sanghavi',
    _live: true,
  }
}

// Cover image: an admin-supplied URL wins, else the conventional /media file
// (which ImageSlot replaces with a tasteful placeholder if it is missing).
export function coverSrc(post) {
  return post?.cover_url || `/media/blog-${post?.slug}.jpg`
}

export function usePosts() {
  const [state, setState] = useState({ posts: staticPosts, loading: true, live: false })

  useEffect(() => {
    let alive = true
    fetch('/api/posts', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad response'))))
      .then((rows) => {
        if (!alive) return
        if (Array.isArray(rows) && rows.length) {
          setState({ posts: rows.map(normalize), loading: false, live: true })
        } else {
          setState({ posts: staticPosts, loading: false, live: false })
        }
      })
      .catch(() => {
        if (alive) setState({ posts: staticPosts, loading: false, live: false })
      })
    return () => {
      alive = false
    }
  }, [])

  return state
}

export function usePost(slug) {
  const [state, setState] = useState({ post: null, loading: true, notFound: false })

  useEffect(() => {
    let alive = true
    setState({ post: null, loading: true, notFound: false })

    const fallback = () => {
      const local = staticPosts.find((p) => p.slug === slug)
      if (alive) setState({ post: local || null, loading: false, notFound: !local })
    }

    fetch(`/api/posts/${slug}`, { credentials: 'include' })
      .then((r) => {
        if (r.status === 404) return null
        if (!r.ok) throw new Error('bad response')
        return r.json()
      })
      .then((row) => {
        if (!alive) return
        if (row && row.slug) setState({ post: normalize(row), loading: false, notFound: false })
        else fallback()
      })
      .catch(fallback)

    return () => {
      alive = false
    }
  }, [slug])

  return state
}
