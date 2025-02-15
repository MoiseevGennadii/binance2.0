function time() {
    let data = new Date();
    let year = data.getFullYear();
    return year;
  }
document.querySelector(".time").innerHTML = '&copy' + " " + time();	