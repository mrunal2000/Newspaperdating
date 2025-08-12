FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Verify files exist
RUN ls -la public/ && ls -la src/

# Verify files exist
RUN ls -la public/ && ls -la src/



# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
