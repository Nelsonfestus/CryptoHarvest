<template>
  <div class="container">
    <div class="header_section">
        <h1>Our newsletter</h1>
        <p>Sign up with your email to recieve our newsletter.thank you!</p>
    </div>
    <div class="search_section">
        <input type="text" placeholder="Enter email here">
        <button>subscribe <i class="bi bi-send-fill"></i></button>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
.container{
    background-color: #151515dc;
    height: 30vh;
    align-items: center;
}

.header_section h1{
    text-align: center;
    width:100%;
  font-weight: 800;
  font-size: 420%;
  background: linear-gradient(45deg, #f83201, #ffa600);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
}
.header_section p{
    text-align: center;
    font-weight: 600;
    color: white;
}

.search_section{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
}
.search_section input{
    border: 0.5px solid grey;
    width: 16.8cm;
    height: 50px;
    padding-left: 10px;
    color: grey;
    background-color: black;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.search_section input:focus{
    border: 1px solid orange;
    outline: none;
    transition: 0.7s;
}
.search_section button{
    width: 4cm;
    height: 50px;
    color: azure;
    font-weight: 400;
    border: none;
    background: linear-gradient(45deg, #f83201, #ffa600);
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

</style>