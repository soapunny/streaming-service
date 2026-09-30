#!/usr/bin/env bash
# Measures cache MISS vs HIT latency for one endpoint and prints the median.
# Usage: ./measure-latency.sh <path> <redis-key> [runs]
#   e.g. ./measure-latency.sh "/api/movie/550" "tmdb:/movie/550?append_to_response=videos"
# Env: BASE_URL (default http://localhost:4000), REDIS_URL (default redis://localhost:6379)
set -euo pipefail

path=$1
key=$2
runs=${3:-20}
base=${BASE_URL:-http://localhost:4000}
redis=${REDIS_URL:-redis://localhost:6379}

time_ms() { curl -s -o /dev/null -w '%{time_total}' "$base$path" | awk '{printf "%.1f\n", $1 * 1000}'; }
median() { sort -n | awk '{a[NR]=$1} END {print (NR % 2 ? a[(NR+1)/2] : (a[NR/2] + a[NR/2+1]) / 2)}'; }

# MISS: delete the key before every request so each one goes to TMDB.
miss=$(for _ in $(seq "$runs"); do redis-cli -u "$redis" del "$key" >/dev/null; time_ms; done | median)

# HIT: warm the cache once, then every request is served from Redis.
time_ms >/dev/null
hit=$(for _ in $(seq "$runs"); do time_ms; done | median)

echo "$path  runs=$runs  miss median=${miss}ms  hit median=${hit}ms"
