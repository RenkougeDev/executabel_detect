import os
import sys
import json
import time

with open("resources/app/src/config.json", "rt") as flin:
    objects = json.load(flin)
    print("out | " + str(objects).lower(), flush = True)
    sys.stdout.flush()
    
while True:
    print("in | ", flush = True)
    sys.stdout.flush()
    user_action = sys.stdin.readline().strip()
    if not user_action: break
    with open("resources/app/src/config.json", "rt") as flin: # took the config.json from compiled "Execute detect.exe" to this part
        objects = json.load(flin)
        try:
            objects[user_action] = not objects[user_action]
        except: pass
        with open("resources/app/src/config.json", "wt") as flout:
            json.dump(objects, flout, indent = 4)
        print("out | " + str(objects).lower(), flush = True)
        sys.stdout.flush()