let housingData;
let minLat, maxLat, minLon, maxLon, minPrice, maxPrice;

function preload() {
  // Load the CSV file
  housingData = loadTable('housing_data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 600);

  if (housingData.getRowCount() === 0) {
    console.error("No data loaded. Check your CSV file!");
    noLoop();
    return;
  }

  // Parse and find min/max for scaling
  minLat = min(housingData.getColumn('latitude').map(Number));
  maxLat = max(housingData.getColumn('latitude').map(Number));
  minLon = min(housingData.getColumn('longitude').map(Number));
  maxLon = max(housingData.getColumn('longitude').map(Number));
  minPrice = min(housingData.getColumn('price').map(Number));
  maxPrice = max(housingData.getColumn('price').map(Number));
}

function draw() {
  background(220);
  textSize(16);
  textAlign(CENTER, TOP);
  text("Housing Data Visualization", width / 2, 10);

  for (let i = 0; i < housingData.getRowCount(); i++) {
    let row = housingData.getRow(i);
    let lat = Number(row.get('latitude'));
    let lon = Number(row.get('longitude'));
    let price = Number(row.get('price'));

    let x = map(lon, minLon, maxLon, 50, width - 50);
    let y = map(lat, maxLat, minLat, 50, height - 50);
    let size = map(price, minPrice, maxPrice, 5, 30);

    fill(100, 150, 255, 200);
    noStroke();
    ellipse(x, y, size);

    fill(0);
    textSize(12);
    text(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`, x + 5, y - 5);
  }
}
