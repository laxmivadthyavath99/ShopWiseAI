from product_matcher import find_similar_products

products = [
    {
        "name": "Lakme Forever Matte Liquid Lipstick",
        "price": "180",
        "platform": "Amazon"
    },
    {
        "name": "Lakme Forever Matte Lip Colour",
        "price": "131",
        "platform": "Myntra"
    },
    {
        "name": "Lakme Forever Matte Liquid Lip",
        "price": "199",
        "platform": "Nykaa"
    },
    {
        "name": "Lakme Matte Lipstick",
        "price": "175",
        "platform": "Flipkart"
    }
]

groups = find_similar_products(products)

for group in groups:

    print("\nGROUP")

    for item in group:

        print(
            item["platform"],
            item["name"],
            item["price"]
        )