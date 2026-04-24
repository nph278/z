import sys
import re

f = open("./emrpg_rooms.txt")
txt = re.sub(r'\n\n\n+', "\n\n", f.read()[:-1].replace("\r\n", "\n"))

paras = txt.split("\n\n");

room_ids = []
references = []

for para in paras:
    lines = para.split("\n")
    rid = lines[0].lower().split(":")[0]
    desc = lines[1]
    extras = []
    room_ids.append(rid)
    print("{")
    print("id: \"" + rid + "\",")
    print("desc: \"" + desc + "\",")
    print("options: [")
    for l in lines[2:]:
        if (l[0] == "$"):
            if (':' in l):
                extras.append(re.sub(r'\s+$', "", l)[1:].split(": "))
            else:
                extras.append([re.sub(r'\s+$', "", l)[1:], "true"])
        else:
            oid = l.split(" ")[0][:-1].lower()
            odesc = re.sub(r'\.?\s*$', "", l[len(oid)+2:])
            references.append(oid)
            print("[\"" + oid + "\", \"" + odesc + "\"],")
    print("],")
    for q in extras:
        if q[0] == "dryebux":
            print(q[0] + ": " + q[1] + ",")
        else:
            print(q[0] + ": \"" + q[1] + "\",")
    print("},")

for rid in references:
    if not (rid in room_ids):
        print(rid, file=sys.stderr)

