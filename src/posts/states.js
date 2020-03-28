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
        VarifyState : function(state){
            if(Object.keys(this.states).includes(state)){
                return state
            }
            return false
        },
        VerifyLocation : function(city, state){
            const checkState = this.VarifyState(state)
            if(checkState){
                    return this.getCities(state).includes(city)
            }
            else{ return false }
        },
        getCityFromInput : function(input){
            const city = input.slice(0, input.indexOf(','))
            return city
        },
        getStateFromInput : function(input){
            const state = input.slice(input.indexOf(',') + 2, input.length)
            return state
        }
}

module.exports = states

