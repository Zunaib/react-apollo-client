const { gql } = require('apollo-server');

const typeDefs = gql`

#Query Part
type Query {
    launches( # replace the current launches query with this one.
        pageSize: Int
        after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
}

type LaunchConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
}

type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Rocket {
    id: ID!
    name: String
    type: String
}

type User {
    id: ID!
    email: String!
    trips: [Launch]!
} 

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}


#Mutation Part
type Mutation {
    missionPatch(mission: String, size: PatchSize): PatchSize

    # if false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token
}

type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
}

`;

module.exports = typeDefs;