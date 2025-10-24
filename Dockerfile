# Use lightweight Nginx image
FROM nginx:alpine

# Copy website files into Nginx web root
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx will automatically serve index.html
