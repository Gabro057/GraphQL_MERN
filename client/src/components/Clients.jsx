import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import Spinner from './Spinner'
import { GET_CLIENTS } from '../queries/clientQueries'


export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if(loading) return <Spinner />
  if(error) return <p>Nastala chyba!</p>

  return (
    <>
      { !loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { data.clients.map(client => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
} 
