import {ApolloClient, InMemoryCache} from "@apollo/client";
import {GET_SPACE_MISSON} from "./queries";
export const apolloClient = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
});
class SpaceService {
    async getSpaceMission(limit=10) {
        try{
            const response = await apolloClient.query({
                query: GET_SPACE_MISSON,
                variables: {limit}
            })

            if(!response || !response.data) throw new Error("cannot get rocket launches list!")
            return response.data.launchesPast
        } catch(err){
            throw err
        }
    }
}

export default new SpaceService();
