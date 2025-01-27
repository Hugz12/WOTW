import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter()
  },
  vite: {
    server: {
      port: 5173
    }
  }
};
