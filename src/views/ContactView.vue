<template>
  <div class="contact_container">
    <div class="input_container">
      <div class="input_inside_1">
        <input type="text" placeholder="Your Name" name="your name">
        <input type="text" placeholder="Your Email" name="your email">
      </div>
      <div class="input_inside_2">
        <input type="text" placeholder="Subject" name="subject">
      </div>
      <div class="input_inside_3">
         <textarea name="message" id="" placeholder="message"></textarea>
        </div>
      <div class="input_inside_4">
      <button>Send message</button>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'ContactView',
}
</script>

<style scoped>
.contact_container {
  background-color: #151515;
  height: 100vh;
}

.input_container {
  padding-top: 4.5cm;
}

.input_inside_1,
.input_inside_2,
.input_inside_3 {
  display: flex;
  row-gap: 3%;
  column-gap: 3%;
  justify-content: center;
  align-items: center;
  /* padding-top: 30px; */
  padding: 20px 60px;
}

.input_inside_1 input {
  width: 50%;
  height: 6vh;
  border-radius: 5px;
  border: 0.5px solid rgba(128, 128, 128, 0.447);
  padding-left: 10px;
  background-color: rgba(0, 0, 0, 0.907);
  font-size: 15px;
  color: rgba(255, 255, 255, 0.562);
}

.input_inside_1 input:focus {
  border: 1px solid orange;
  outline: none;
}

.input_inside_2 input {
  width: 100%;
  height: 6.5vh;
  border-radius: 5px;
  border: 0.5px solid rgba(128, 128, 128, 0.447);
  padding-left: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 110%;
  color: rgba(255, 255, 255, 0.562);
}

.input_inside_2 input:focus {
  border: 1px solid orange;
  outline: none;
}

.input_inside_3 textarea {
  width: 100%;
  height: 20vh;
  border-radius: 5px;
  border: 0.5px solid rgba(128, 128, 128, 0.447);
  padding-left: 10px;
  padding-top: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 110%;
  color: rgba(255, 255, 255, 0.562);
}

.input_inside_2 textarea:focus {
  border: 1px solid orange;
  outline: none;
}

.input_inside_4{
  display: flex;
  justify-content: center;
  padding: 20px 60px;
}

.input_inside_4 button{
  width: 100%;
  height: 6vh;
  background: linear-gradient(45deg, #f83201, #ffa600);
  border: none;
  color: white;
  font-weight: 600;
  font-size: 15px;
}

.input_inside_4 button:hover{
  cursor: pointer;
}

@media screen and (max-width: 1200px){
  *{
    padding: 0;
    margin: 0;
  }

  .input_inside_1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-top: 30px; */
  padding: 0px 10px;
}

.input_inside_2,
.input_inside_3{
  padding: 20px 10px;
}

.input_inside_1 input{
  width: 100%;
  margin-bottom: 20px;
}

@media screen and (max-width: 320px){
 *{
  padding: 0;
  margin: 0;
 }

 .contact_container {
  background-color: #151515;
  height: 140vh;
}

.input_inside_1 input,
.input_inside_2 input
{
   height: 8vh;
}
}

}
</style>