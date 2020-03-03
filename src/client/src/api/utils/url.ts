export default function url(...urlElms: (string | undefined)[]): string {
  return urlElms.filter((urlElm) => urlElm).join('/')
}
