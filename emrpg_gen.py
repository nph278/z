import sys
import re

f = open("./emrpg_rooms.txt")
txt = re.sub(r'^\s$', "", re.sub(r'\n\n\n+', "\n\n", f.read()[:-1].replace("\r\n", "\n")))

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
            replaces = False
            if l[0] == "#":
                onetime = True
                l = l[1:]
            while l[0] == "^":
                if replaces == False:
                    replaces = []
                l = l[1:]
                q = l.split("^")
                replaces.append([q[0].lower(), q[1].lower(), q[2].lower()])
                l = "^".join(q[3:])
            while l[0] == "&":
                if replaces == False:
                    replaces = []
                l = l[1:]
                q = l.split("&")
                replaces.append([q[0].lower(), q[1].lower()])
                l = "&".join(q[2:])
            oid = l.split(" ")[0][:-1].lower()
            odesc = re.sub(r'([^\.])\.?\s*$', r'\1', l[len(oid)+2:])
            odesc = odesc[0].upper() + odesc[1:]
            if not (oid in references):
                references.append(oid)
            if onetime:
                print("[\"" + oid + "\", \"" + odesc + "\", true],")
            elif replaces != False:
                print("['" + oid + "', '" + odesc + "', " + ",".join(["[" + ",".join(["'" + s + "'" for s in l]) + "]" for l in replaces]) + "],")
            else:
                print("[\"" + oid + "\", \"" + odesc + "\"],")
    print("],")
    for q in extras:
        q0 = q[0].lower()
        if q0 == "dryebux":
            print(q0 + ": " + q[1] + ",")
        else:
            print(q0 + ": \"" + q[1] + "\",")
    print("},")

for rid in references:
    if not (rid in room_ids):
        print(rid, file=sys.stderr)

