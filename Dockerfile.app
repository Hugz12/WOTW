# Dockerfile for running the application
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY app .

# Install app dependencies
RUN npm install

# Expose the port the app runs in
EXPOSE 5173

# Execute the application when the container starts
CMD ["npm", "run", "dev"]

