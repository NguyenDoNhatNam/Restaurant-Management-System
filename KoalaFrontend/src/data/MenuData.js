const menuItems = [
    // Sashimi
    { id: 1, name: 'Salmon Sashimi', price: '150.000', category: 'Sashimi', image: "../images/food/sashimi_image/SpicySalmonSashimi.jpg", status: "Available", rating: 4, stock: 20 },
    { id: 2, name: 'Tako Sashimi', price: '160.000', category: 'Sashimi', image: "../images/food/sashimi_image/TakoSashimi.jpg", status: "Available", rating: 5, stock: 15 },
    { id: 3, name: 'Yellowtail Sashimi', price: '180.000', category: 'Sashimi', image: "../images/food/sashimi_image/kimochinissin.jpg", status: "Available", rating: 4, stock: 10 },

    // Sushi
    { id: 4, name: 'Avocado Kaisen Oshisushi', price: '328.000', category: 'Sushi', image: "../images/food/sushi_image/AvocadoKaisenOshisushi.jpg", status: "Available", rating: 5, stock: 8 },
    { id: 5, name: 'Foie Gras Tobiko Oshisushi', price: '498.000', category: 'Sushi', image: "../images/food/sushi_image/FoieGrasTobikoOshisushi.jpg", status: "Available", rating: 4, stock: 5 },
    { id: 6, name: 'Maguro Cheese Oshisushi', price: '198.000', category: 'Sushi', image: "../images/food/sushi_image/MaguroCheeseOshisushi.jpg", status: "Stock out", rating: 3, stock: 0 },
    { id: 7, name: 'Unagi Oshisushi', price: '298.000', category: 'Sushi', image: "../images/food/sushi_image/UnagiOshisushi.jpg", status: "Available", rating: 4, stock: 12 },

    // Salad
    { id: 8, name: 'Ebi Salad', price: '198.000', category: 'Salad', image: "../images/food/salad_image/EbiSalad198.jpg", status: "Available", rating: 4, stock: 10 },
    { id: 9, name: 'Special Sashimi Salad', price: '350.000', category: 'Salad', image: "../images/food/salad_image/SpecialSashimiSalad.jpg", status: "Stock out", rating: 5, stock: 0 },
    { id: 10, name: 'Tobiko Goma Wakame Salad', price: '168.000', category: 'Salad', image: "../images/food/salad_image/TobikoGomaWakameSalad168.jpg", status: "Available", rating: 3, stock: 20 },

    // Wagyu
    { id: 11, name: 'Sliced Wagyu Steak', price: '379.000', category: 'Wagyu', image: "../images/food/Wagyu/Wagyu1.jpg", status: "Stock out", rating: 4, stock: 0 },
    { id: 12, name: 'Wagyu beef tenderloin', price: '500.000', category: 'Wagyu', image: "../images/food/Wagyu/Wagyu2.jpg", status: "Available", rating: 5, stock: 5 },

    // Nabe (Hotpot)
    { id: 13, name: 'Chanko', price: '250.000', category: 'Hotpot', image: "../images/food/Hotpot/Chanko.jpg", status: "Available", rating: 4, stock: 7 },
    { id: 14, name: 'Shabu Shabu', price: '240.000', category: 'Hotpot', image: "../images/food/Hotpot/ShabuShabu.jpg", status: "Available", rating: 4, stock: 9 },

    // Beer
    { id: 15, name: 'Strongbow', price: '40.000', category: 'Beer', image: "../images/food/beer_image/Strongbow.jpg", status: "Available", rating: 3, stock: 30 },
    { id: 16, name: 'Tiger', price: '40.000', category: 'Beer', image: "../images/food/beer_image/Tiger.jpg", status: "Available", rating: 4, stock: 25 },
    { id: 17, name: 'Heineken', price: '40.000', category: 'Beer', image: "../images/food/beer_image/Heineken.png", status: "Available", rating: 5, stock: 20 },
    { id: 18, name: 'Sài Gòn Special', price: '40.000', category: 'Beer', image: "../images/food/beer_image/SaiGonSpecial.jpg", status: "Available", rating: 3, stock: 15 },
    { id: 19, name: 'Bia Hà Nội Lon', price: '40.000', category: 'Beer', image: "../images/food/beer_image/HaNoi.jpg", status: "Available", rating: 4, stock: 10 },
    { id: 20, name: 'Saporro', price: '40.000', category: 'Beer', image: "../images/food/beer_image/Saporro.jpg", status: "Available", rating: 4, stock: 18 },

    // Wine
    { id: 21, name: 'Vodka Rusia Alligator', price: '400.000', category: 'Wine', image: "../images/food/wine_image/Ruou_vodka_nga_alligator.jpg", status: "Available", rating: 3, stock: 5 },
    { id: 22, name: 'Cantina Vierre Vino Rosso', price: '900.000', category: 'Wine', image: "../images/food/wine_image/ruoucantina.jpg", status: "Available", rating: 5, stock: 8 },
];

const trendingItems = [
    { id: 1, name: 'Salmon Sashimi', price: '150.000', category: 'Sashimi', image: "../images/food/sashimi_image/SpicySalmonSashimi.jpg", status: "Available", rating: 4, stock: 20 },
    { id: 11, name: 'Sliced Wagyu Steak', price: '379.000', category: 'Wagyu', image: "../images/food/Wagyu/Wagyu1.jpg", status: "Stock out", rating: 4, stock: 0 },
    { id: 7, name: 'Unagi Oshisushi', price: '298.000', category: 'Sushi', image: "../images/food/sushi_image/UnagiOshisushi.jpg", status: "Available", rating: 4, stock: 12 },
    { id: 9, name: 'Special Sashimi Salad', price: '350.000', category: 'Salad', image: "../images/food/salad_image/SpecialSashimiSalad.jpg", status: "Stock out", rating: 5, stock: 0 },
    { id: 14, name: 'Shabu Shabu', price: '240.000', category: 'Hotpot', image: "../images/food/Hotpot/ShabuShabu.jpg", status: "Available", rating: 4, stock: 9 },
];

export { menuItems, trendingItems };
