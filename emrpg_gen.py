f = open("./emrpg_rooms.txt")
txt = f.read()[:-1]

paras = txt.split("\n\n");

for para in paras:
    lines = para.split("\n")
    rid = lines[0][:-1].lower()
    desc = lines[1]
    print("{")
    print("id: \"" + rid + "\",")
    print("desc: \"" + desc + "\",")
    print("options: [")
    for l in lines[2:]:
        oid = l.split(" ")[0][:-1].lower()
        odesc = l[len(oid)+2:]
        print("[\"" + oid + "\", \"" + odesc + "\"],")
    print("],")
    print("},")

