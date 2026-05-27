#!/usr/bin/env python3
"""
Analyze GUI fuzzing test results and generate a summary report.
Reads JSON files with fuzzing results and provides pass/fail statistics.
"""

import json
import os
from pathlib import Path
from collections import defaultdict

def analyze_fuzz_results(directory: str = ".") -> None:
    """Analyze all fuzz_test_*.json files in the directory and print a summary report."""
    
    # Find all fuzz test JSON files
    fuzz_files = sorted(Path(directory).glob("fuzz_test_*.json"))
    
    if not fuzz_files:
        print("No fuzz test JSON files found.")
        return
    
    overall_stats = {
        "total_tests": 0,
        "passed": 0,
        "failed": 0,
        "by_url": {}
    }
    
    print("=" * 80)
    print("GUI FUZZING TEST RESULTS SUMMARY")
    print("=" * 80)
    print()
    
    # Process each file
    for fuzz_file in fuzz_files:
        try:
            with open(fuzz_file, 'r') as f:
                results = json.load(f)
            
            # Extract URL from filename: fuzz_test_httpslocalhost:3000_login.json -> https://localhost:3000/login
            filename = fuzz_file.stem  # Remove .json
            url_part = filename.replace("fuzz_test_", "").replace("_", "/")
            # Reconstruct URL: httpslocalhost:3000login -> https://localhost:3000/login
            url_part = url_part.replace("httpslocalhost:", "https://localhost:").replace("login", "login")
            # Better approach: extract from the actual result
            if results and isinstance(results[0], list) and len(results[0]) > 0:
                url = results[0][0].get("url", "unknown")
            else:
                url = "unknown"
            
            passed = sum(1 for result in results if isinstance(result, list) and len(result) > 1 and result[1] == "PASS")
            failed = sum(1 for result in results if isinstance(result, list) and len(result) > 1 and result[1] == "FAIL")
            total = passed + failed
            
            pass_pct = (passed / total * 100) if total > 0 else 0
            fail_pct = (failed / total * 100) if total > 0 else 0
            
            overall_stats["total_tests"] += total
            overall_stats["passed"] += passed
            overall_stats["failed"] += failed
            overall_stats["by_url"][url] = {
                "passed": passed,
                "failed": failed,
                "total": total,
                "pass_pct": pass_pct,
                "fail_pct": fail_pct
            }
            
            print(f"📋 {url}")
            print(f"   Passed: {passed}/{total} ({pass_pct:.1f}%)")
            print(f"   Failed: {failed}/{total} ({fail_pct:.1f}%)")
            print()
            
        except json.JSONDecodeError:
            print(f"⚠️  Error reading {fuzz_file.name}: Invalid JSON")
        except Exception as e:
            print(f"⚠️  Error processing {fuzz_file.name}: {e}")
    
    # Print overall summary
    print("=" * 80)
    print("OVERALL SUMMARY")
    print("=" * 80)
    overall_total = overall_stats["total_tests"]
    if overall_total > 0:
        overall_pass_pct = (overall_stats["passed"] / overall_total * 100)
        overall_fail_pct = (overall_stats["failed"] / overall_total * 100)
        print(f"Total Tests: {overall_total}")
        print(f"Passed: {overall_stats['passed']} ({overall_pass_pct:.1f}%)")
        print(f"Failed: {overall_stats['failed']} ({overall_fail_pct:.1f}%)")
        print()
        
        # Print URL summary table
        print("URL BREAKDOWN:")
        print(f"{'URL':<50} {'Passed':<10} {'Failed':<10} {'Pass %':<8}")
        print("-" * 78)
        for url, stats in sorted(overall_stats["by_url"].items()):
            pass_count = f"{stats['passed']}/{stats['total']}"
            fail_count = f"{stats['failed']}/{stats['total']}"
            print(f"{url:<50} {pass_count:<10} {fail_count:<10} {stats['pass_pct']:.1f}%")
    else:
        print("No test results found.")
    
    print()

if __name__ == "__main__":
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    analyze_fuzz_results(script_dir)
