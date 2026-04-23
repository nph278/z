import sys

f = open("./emrpg_rooms.txt")
txt = f.read()[:-1]

paras = txt.split("\n\n");

room_ids = []
references = []

for para in paras:
    lines = para.split("\n")
    rid = lines[0][:-1].lower()
    desc = lines[1]
    room_ids.append(rid)
    print("{")
    print("id: \"" + rid + "\",")
    print("desc: \"" + desc + "\",")
    print("options: [")
    for l in lines[2:]:
        oid = l.split(" ")[0][:-1].lower()
        odesc = l[len(oid)+2:]
        references.append(oid)
        print("[\"" + oid + "\", \"" + odesc + "\"],")
    print("],")
    print("},")

for rid in references:
    if not (rid in room_ids):
        print(rid, file=sys.stderr)

