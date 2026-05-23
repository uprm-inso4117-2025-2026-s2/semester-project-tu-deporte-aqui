method normalizeGameStatus(input: string) returns (output: string)
    
    ensures input == "" ==> output == "unknown"
    ensures input == "scheduled" || input == "upcoming"|| input == "not_started" || input == "pregame"|| input == "pending"   ==> output == "upcoming"
    ensures input == "live" || input == "active" || input=="in_progress" || input == "ongoing"  ==> output == "live"
    ensures input == "delayed"|| input == "postponed" || input == "suspended" || input == "rain_delay" ==> output == "delayed"
    ensures input == "final" || input == "finished" || input == "complete" || input == "completed" || input == "ended" ==> output == "final"



{
    if input == "" {
        output := "unknown";
    }
    else if input == "live" || input == "in_progress" || input == "ongoing" || input == "active" {
        output := "live";
    }
    else if input == "upcoming" || input == "not_started" || input == "scheduled" || input == "pregame" || input == "pending" {
        output := "upcoming";
    }
    else if input == "delayed" || input == "postponed" || input == "suspended" || input == "rain_delay" {
        output := "delayed";
    } 
    else if input == "final" || input == "finished" || input == "complete" || input == "completed" || input == "ended" {
        output := "final";
    } 
    else { 
        output := "unknown";
    }
}

method TestCase1() {
    var output1 := normalizeGameStatus("upcoming");
    assert output1 == "upcoming";
}

method TestCase2(){
    var output2 := normalizeGameStatus("");
    assert output2 == "unknown";
}

method TestCase3(){
    var output3 := normalizeGameStatus("ongoing");
    assert output3 == "live";
}
method TestCase4() {
    var output4 := normalizeGameStatus("scheduled");
    assert output4 == "upcoming";
}

method TestCase5() {
    var output5 := normalizeGameStatus("not_started");
    assert output5 == "upcoming";
}

method TestCase6() {
    var output6 := normalizeGameStatus("pregame");
    assert output6 == "upcoming";
}

method TestCase7() {
    var output7 := normalizeGameStatus("pending");
    assert output7 == "upcoming";
}
method TestCase8() {
    var output8 := normalizeGameStatus("active");
    assert output8 == "live";
}
method TestCase9() {
    var output9 := normalizeGameStatus("in_progress");
    assert output9 == "live";
}

method TestCase10() {
    var output10 := normalizeGameStatus("ongoing");
    assert output10 == "live";
} 

method TestCase11() {
    var output11 := normalizeGameStatus("delayed");
    assert output11 == "delayed";
}  

method TestCase12() {
    var output12 := normalizeGameStatus("postponed");
    assert output12 == "delayed";
}  
method TestCase13() {
    var output13 := normalizeGameStatus("suspended");
    assert output13 == "delayed";
}  
method TestCase14() {
    var output14 := normalizeGameStatus("rain_delay");
    assert output14 == "delayed";
}  
method TestCase15() {
    var output15 := normalizeGameStatus("final");
    assert output15 == "final";
}  

method TestCase16() {
    var output16 := normalizeGameStatus("finished");
    assert output16 == "final";
}

method TestCase17() {
    var output17 := normalizeGameStatus("complete");
    assert output17 == "final";
}
method TestCase18() {
    var output18 := normalizeGameStatus("ended");
    assert output18 == "final";
}
 
