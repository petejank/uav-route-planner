import url from './url'

const RESOURCE = 'plan'

export default function(id?: string): string {
  return url(RESOURCE, id)
}
