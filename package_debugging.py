import os
import sys

site_packages_path = '/Users/jwells167/University/iot_assignments/data_analysis_iot_assignment_3/web-app/.venv/lib/python3.9/site-packages'

if site_packages_path not in sys.path:
    print("Site-packages directory not in sys.path, adding it.")
    sys.path.append(site_packages_path)

try:
    import requests
    print("Requests successfully imported:", requests.__file__)
except ImportError as e:
    print("Still cannot import requests:", e)
