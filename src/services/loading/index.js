import { store, setLoading } from '../../modules';


export const pageLoading = visible => {
  store.dispatch(setLoading(visible))
}