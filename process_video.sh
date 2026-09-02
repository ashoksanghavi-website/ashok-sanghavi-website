#!/bin/bash
# ============================================================================
#  Ashok Sanghavi — hero video pipeline
#  Turns 6 raw clips into one seamless, web-optimized scroll-scrub master.
#
#  1. Drop your 6 source clips into  raw/  named EXACTLY in scroll order:
#       raw/01-exterior.mp4   (drone / street approach)
#       raw/02-entrance.mp4   (approaching the glass entrance)
#       raw/03-lobby.mp4      (moving through the lobby)
#       raw/04-meeting.mp4    (advisor showing growth in the meeting)
#       raw/05-couple.mp4     (elderly couple, warm)
#       raw/06-handshake.mp4  (advisor and client handshake — the finale)
#  2. Run:  bash process_video.sh
#  Outputs land in  public/hero/  (master.mp4, master.webm, poster.jpg).
# ============================================================================
set -e
cd "$(dirname "$0")"
mkdir -p graded public/hero

CLIPS="01-exterior 02-entrance 03-lobby 04-meeting 05-couple 06-handshake"

echo "### 1/4  Grade each clip (crop watermark, warm emerald+gold grade, denoise, sharpen, vignette, grain)"
for f in $CLIPS; do
  echo "   grading $f"
  ffmpeg -y -i "raw/$f.mp4" -vf "crop=iw*0.94:ih*0.94:0:0,scale=1920:1080,eq=contrast=1.08:saturation=1.14:gamma=1.02,curves=g='0/0 0.5/0.53 1/1':b='0/0.02 0.5/0.5 1/0.96',hqdn3d=2:1:2:2,unsharp=5:5:0.6,vignette=PI/6,noise=alls=5:allf=t" \
    -r 30 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -an "graded/$f.mp4" </dev/null
done

echo "### 2/4  Concatenate into one master"
: > graded/list.txt
for f in $CLIPS; do echo "file '$f.mp4'" >> graded/list.txt; done
ffmpeg -y -f concat -safe 0 -i graded/list.txt -c copy graded/master_raw.mp4 </dev/null

# Web encode filter: a gentle denoise tames the baked grain, kept at full HD
# 1920x1080, then a delogo box wipes the Gemini watermark (bottom-right).
WEB_VF="hqdn3d=3:2:3:3,scale=1920:1080,delogo=x=1780:y=925:w=130:h=130"

echo "### 3/4  Full-HD web master (1080p, crf 23, dense keyframes g=10; the site streams it via HTTP range)"
ffmpeg -y -i graded/master_raw.mp4 -vf "$WEB_VF" \
  -c:v libx264 -crf 23 -preset slow -g 10 -keyint_min 10 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an public/hero/master.mp4 </dev/null

echo "### 4/4  Poster frame"
# The shipped poster is the clean HD building image (public/hero/poster.jpg).
# Only auto-generate one from the first video frame if none exists yet.
if [ ! -f public/hero/poster.jpg ]; then
  ffmpeg -y -i public/hero/master.mp4 -frames:v 1 -q:v 2 public/hero/poster.jpg </dev/null
fi

echo
echo "Done. Final assets:"
ls -la public/hero/
echo "(You can delete the graded/ folder afterwards — it is only intermediate.)"
