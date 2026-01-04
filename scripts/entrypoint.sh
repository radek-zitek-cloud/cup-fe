#!/bin/sh

# Default value if VITE_API_URL is not set
if [ -z "$VITE_API_URL" ]; then
  VITE_API_URL="https://cup-be-production.up.railway.app"
fi

# Create the env-config.js file
echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
echo "  VITE_API_URL: \"$VITE_API_URL\"" >> /usr/share/nginx/html/env-config.js
echo "};
" >> /usr/share/nginx/html/env-config.js

# Execute Nginx
exec nginx -g "daemon off;"
