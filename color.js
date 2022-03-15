
const apiURL = "https://api.color.pizza/v1/";


// Get complementary color from hex value
function getComplimentaryColor(hex) {
    // strip # from hex value
    hex = hex.replace("#", "");
  
    // convert hex value to RGB
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  
    // get the highest and lowest RGB values
    r = Math.min(255, r + 128);
    g = Math.min(255, g + 128);
    b = Math.min(255, b + 128);
  
    // convert RGB values to HEX
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    // pad with 0s
    if (r.length < 2) {
      r = "0" + r;
    }
    if (g.length < 2) {
      g = "0" + g;
    }
    if (b.length < 2) {
      b = "0" + b;
    }
  
    // return HEX value
    return "#" + r + g + b;
  }

(async function() {
    const response = await fetch(apiURL);
    const data = await response.json();
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const randomIndex = random(0, data.colors.length);

    const color = data.colors[randomIndex];

    const colorR = parseInt(color.hex.replace('#', '').substring(0, 2), 16);
    const colorG = parseInt(color.hex.replace('#', '').substring(2, 4), 16);
    const colorB = parseInt(color.hex.replace('#', '').substring(4, 6), 16);

    const complementary = getComplimentaryColor(color.hex);

    document.body.style.backgroundColor = color.hex;
    document.body.style.color = complementary;

    const colorName = document.querySelector('.color-name');
    colorName.textContent = color.name;
    const colorHex = document.querySelector('.color-hex');
    colorHex.textContent = color.hex;
    const colorRgb = document.querySelector('.color-rgb');
    colorRgb.textContent = `rgb(${colorR}, ${colorG}, ${colorB})`;

    console.log(color.luminance);
    if (color.luminance >= 130) {
        colorName.style.filter = "invert(70%)";
        colorHex.style.filter = "invert(70%)";
        colorRgb.style.filter = "invert(70%)";
    } else {
          document.body.style.color = complementary;
    }
}());