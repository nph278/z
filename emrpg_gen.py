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
        if l[0] == "$":
            if (':' in l):
                extras.append(re.sub(r'\s+$', "", l)[1:].split(": "))
            else:
                extras.append([re.sub(r'\s+$', "", l)[1:], "true"])
        else:
            onetime = False
            replace = False
            replace2 = False
            if l[0] == "#":
                onetime = True
                l = l[1:]
            elif l[0] == "^":
                l = l[1:]
                q = l.split("^")
                replace = [q[0].lower(), q[1].lower(), q[2].lower()]
                l = q[3]
            elif l[0] == "&":
                l = l[1:]
                q = l.split("&")
                replace2 = [q[0].lower(), q[1].lower()]
                l = q[2]
            oid = l.split(" ")[0][:-1].lower()
            odesc = re.sub(r'([^\.])\.?\s*$', r'\1', l[len(oid)+2:])
            odesc = odesc[0].upper() + odesc[1:]
            references.append(oid)
            if onetime:
                print("[\"" + oid + "\", \"" + odesc + "\", true],")
            elif replace:
                print("['" + oid + "', '" + odesc + "', ['" + replace[0] + "', '" + replace[1] + "', '" + replace[2] + "']],")
            elif replace2:
                print("['" + oid + "', '" + odesc + "', ['" + replace2[0] + "', '" + replace2[1] + "']],")
            else:
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

