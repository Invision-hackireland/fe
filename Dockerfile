FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package info and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Run Vite's dev server, binding to 0.0.0.0 so Docker host can access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
