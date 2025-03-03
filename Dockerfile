# Step 1: Build the React application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app using NGINX
FROM nginx:1.25-alpine

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default NGINX static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build files to the NGINX static folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]