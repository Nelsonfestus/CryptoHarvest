<template>
  <div class="Community_section">
    <div class="container">
      <div class="Community_image">
        <img src="../assets/About_background_upper.png" alt="img">
      </div>
      <div class="Community_text">
        <div class="Community_text_header">
          <h1>Join the community</h1>
        </div>
        <div class="Community_text_content">
          <i class="bi bi-check"></i>
          <p>Learn How To Read And Forecast The Markets</p>
        </div>
        <div class="Community_text_content">
          <i class="bi bi-check"></i>
          <p>Discover How To Find Trade Opportunities And Manage Risk</p>
        </div>
        <div class="Community_text_content">
          <i class="bi bi-check"></i>
          <p>Make Smarter Decisions With Experienced Market Analysts Guidance</p>
        </div>
        <div class="Community_text_content">
          <i class="bi bi-check"></i>
          <p>Unlock And Trade Up To $2.5M Of Our Capital - Keep 70% Of Any Profits</p>
        </div>
        <div class="Community_button">
          <button>Learn more</button>
        </div>

      </div>
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  background:
    linear-gradient(rgba(0, 0, 0, 0.895), rgba(0, 0, 0, 0.895)),
    url('../assets/About_background.png');
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  row-gap: 2cm;
  column-gap: 2cm;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
 
}

.Community_image img{
  height: 500px ;
  width: 100%;
}

.Community_text h1{
  width: 55%;
  font-weight: 800;
  font-size: 420%;
  background: linear-gradient(45deg, #f83201, #ffa600);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
}

.Community_text_content{
  display: flex;
  align-items: center;
  padding-top: 5px;
}

.Community_text p{
  font-size: 120%;
  width: 80%;
  font-size: 400;
  line-height: 30.2px;
  letter-spacing: normal;
  color:#E9E9E9;
}

.Community_text_content i{
  color: rgb(214, 56, 3);
  font-weight: 800;
  font-size: 250%;
}

.Community_button{
  padding-top: 20px;
  padding-left: 20px;
  
}

.Community_button button{
  padding:15px;
  border: none;
  background: linear-gradient(45deg, #f83201, #ffa600);
  border-radius:8px;
  width: 4cm;
  font-weight: 800;
  color: white;
}

@media screen and (max-width: 1200px){
  *{
    padding: 0;
    margin: 0;
  }

  .Community_image img{
     height: 400px;
     padding: 15px;
     width: 100%;

  }

  .container{
    padding-top: 6.5cm;
    flex-direction: column;
    /* background-size: contain; */
    height: 190vh;
  background-size: cover;
  background-position: center;
  }

  .Community_text h1{
  padding-left: 10px;
  width: 100%;
  font-weight: 800;
  font-size: 5vh;
  background: linear-gradient(45deg, #f83201, #ffa600);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
}

@media screen and (max-width: 320px){
  *{
    padding: 0;
    margin: 0;
  } 

  .container{
    padding-top: 6.5cm;
    flex-direction: column;
    /* background-size: contain; */
    height: 240vh;
  background-size: cover;
  background-position: center;
  }
}
}
</style>