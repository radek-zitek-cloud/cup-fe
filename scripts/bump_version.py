import sys
import json
from pathlib import Path

def bump_version(part):
    pkg_path = Path("package.json")
    with open(pkg_path, 'r') as f:
        data = json.load(f)
    
    version = data['version']
    major, minor, patch = map(int, version.split('.'))
    
    if part == "major":
        major += 1
        minor = 0
        patch = 0
    elif part == "minor":
        minor += 1
        patch = 0
    elif part == "patch":
        patch += 1
    else:
        print(f"Error: Invalid part '{part}'. Use major, minor, or patch.", file=sys.stderr)
        sys.exit(1)
        
    new_version = f"{major}.{minor}.{patch}"
    data['version'] = new_version
    
    with open(pkg_path, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n') # Ensure newline at end of file
    
    print(new_version)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python bump_version.py [major|minor|patch]", file=sys.stderr)
        sys.exit(1)
    
    bump_version(sys.argv[1])
