<template>
    <!-- news-section -->
    <section class="news-section">
      <h1>Our Newsletter</h1>
      <p>Sign up with your email to receive our newsletter. Thank you!</p>
  
      <!-- email input group -->
      <div class="email-input-wrapper">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'NewsLetter',
  }
  </script>
  
  <style scoped>
  .news-section {
    background: #202020;
    color: white;
    text-align: center;
    padding: 60px 20px;
  }
  
  .news-section h1 {
    text-transform: uppercase;
    font-size: 2rem;
    background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
  }
  
  .news-section p {
    text-transform: capitalize;
    margin-bottom: 30px;
    color: #ccc;
    font-size: 1rem;
  }
  
  /* Email input group */
  .email-input-wrapper {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .email-input-wrapper input {
    width: 100%;
    padding: 15px 120px 15px 20px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 1rem;
  }
  
  .email-input-wrapper button {
    position: absolute;
    top: 4px;
    right: 4px;
    bottom: 4px;
    padding: 0 25px;
    border: none;
    background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
    color: white;
    font-size: 0.95rem;
    border-radius: 30px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .email-input-wrapper button:hover {
    background: linear-gradient(90deg, #f63d43 0%, #eb6709 100%);
  }
  </style>
  