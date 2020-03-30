const yourhandle= require('countrycitystatejson')

states = {
        states : {
                "AK" : "Alaska", 
                "AL" : "Alabama", 
                "AR" : "Arkansas", 
                "AS" : "American Samoa", 
                "AZ" : "Arizona", 
                "CA" : "California", 
                "CO" : "Colorado", 
                "CT" : "Connecticut", 
                "DC" : "District of Columbia", 
                "DE" : "Delaware", 
                "FL" : "Florida", 
                "GA" : "Georgia", 
                "GU" : "Guam", 
                "HI" : "Hawaii", 
                "IA" : "Iowa", 
                "ID" : "Idaho", 
                "IL" : "Illinois", 
                "IN" : "Indiana", 
                "KS" : "Kansas", 
                "KY" : "Kentucky", 
                "LA" : "Louisiana", 
                "MA" : "Massachusetts", 
                "MD" : "Maryland", 
                "ME" : "Maine", 
                "MI" : "Michigan", 
                "MN" : "Minnesota", 
                "MO" : "Missouri", 
                "MS" : "Mississippi", 
                "MT" : "Montana", 
                "NC" : "North Carolina", 
                "ND" : "North Dakota", 
                "NE" : "Nebraska", 
                "NH" : "New Hampshire", 
                "NJ" : "New Jersey", 
                "NM" : "New Mexico", 
                "NV" : "Nevada", 
                "NY" : "New York", 
                "OH" : "Ohio", 
                "OK" : "Oklahoma", 
                "OR" : "Oregon", 
                "PA" : "Pennsylvania", 
                "PR" : "Puerto Rico", 
                "RI" : "Rhode Island", 
                "SC" : "South Carolina", 
                "SD" : "South Dakota", 
                "TN" : "Tennessee", 
                "TX" : "Texas", 
                "UT" : "Utah", 
                "VA" : "Virginia", 
                "VI" : "Virgin Islands", 
                "VT" : "Vermont", 
                "WA" : "Washington", 
                "WI" : "Wisconsin", 
                "WV" : "West Virginia", 
                "WY" : "Wyoming"
        },
        getCities: function(state){
            return yourhandle.getCities('US', this.states[state])
        },
        verifyState : function(state){

            let stateCheck = state;
            let tempString = []
            if(!(stateCheck.toUpperCase() === stateCheck) && !(stateCheck.length === 2)){
                tempString = stateCheck.split(' ');
                for(i = 0; i < tempString.length; i++){
                    tempString[i] = tempString[i].charAt(0).toUpperCase() + tempString[i].slice(1).toLowerCase()
                    console.log(tempString[i])
                    if(tempString[i] === 'Of'){ tempString[i] = tempString[i].toLowerCase() }
                }
                stateCheck = tempString.join(' ')
            }
            else if(stateCheck.length === 2){ stateCheck = stateCheck.toUpperCase().trim() }

            console.log(stateCheck)
            if(Object.keys(this.states).includes(stateCheck)){
                return stateCheck
            }
            else if(Object.values(this.states).includes(stateCheck)){
                stateCheck = Object.keys(this.states)[Object.values(this.states).indexOf(stateCheck)]
                return stateCheck
            }
            return false
        },
        verifyCity: function(city, state){
            let cityCheck = city.toLowerCase()
            cityCheck = cityCheck.charAt(0).toUpperCase() + cityCheck.slice(1)
            if(this.getCities(state).includes(cityCheck)){
                return cityCheck
            }
            else{ return false }
        },
        getCityFromInput : function(input){
            const city = input.slice(0, input.indexOf(',')).trim()
            return city
        },
        getStateFromInput : function(input){
            const state = input.slice(input.indexOf(',') + 1, input.length).trim()
            return state
        },
        verifyLocation : function(location){
            let state = this.getStateFromInput(location)
            let city = this.getCityFromInput(location)

            state = this.verifyState(state)
            city = this.verifyCity(city, state)


            if(state && city){
                return city + ', ' + state
            }
            else{ return false }
        }
}

module.exports = states
