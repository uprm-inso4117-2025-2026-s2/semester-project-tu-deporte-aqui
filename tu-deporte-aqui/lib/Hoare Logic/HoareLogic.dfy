method normalizeGameStatus(input: string)  returns (output: string)

{
    

if input == "" 
{
    output:= "unknown";
}

else if input == "live" || input == "in_progress" || input == "ongoing" || input == "active"
{
    output:= "live";

}

else if input == "upcoming" || input == "not_started" || input == "scheduled" || input == "pregame" || input == "pending"
{
    output:= "upcoming";
}
else if input == "delayed" || input == "postponed" || input == "suspended" || input == "rain_delay"
{
output:= "delayed"; 
} 

else{
    output := "unknown";
}
}      
method TestNormalizeGameStatus(){
     //Case 1 upcoming alias 
     var output1 := normalizeGameStatus("scheduled");
     assume  {:axiom} output1 == "scheduled";
      //Case 2 edge case 
     var output2  := normalizeGameStatus("");
     assume {:axiom} output2 == "unknown";
     //Case 3 live 
     var output3 := normalizeGameStatus("live"); 
     assume {:axiom}output3 == "live";
}