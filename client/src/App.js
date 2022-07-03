import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

/*
  Osetreni hlasky:
  Cache data may be lost when replacing the clients field of a Query object.

To address this problem (which is not a bug in Apollo Client), define a custom merge function for the Query.clients field, so InMemoryCache can safely merge these objects: ...
*/
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">               
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
