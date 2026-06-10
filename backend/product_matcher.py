from rapidfuzz import fuzz

def find_similar_products(products):

    groups = []

    used = set()

    for i, product in enumerate(products):

        if i in used:
            continue

        group = [product]

        used.add(i)

        for j, other in enumerate(products):

            if j in used:
                continue

            score = fuzz.ratio(
                product["name"].lower(),
                other["name"].lower()
            )
            #print( product["name"],    " <-> ",    other["name"],    "=",    score)

            if score > 65:

                group.append(other)

                used.add(j)

        groups.append(group)

    return groups