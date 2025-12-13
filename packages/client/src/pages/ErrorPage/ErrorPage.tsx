import { PAGE_TITLES } from '@/constants/pageTitles'

const ErrorPage: React.FC<{ error: '404' | '500' }> = ({ error }) => {
  const title =
    error === '404' ? PAGE_TITLES.NOT_FOUND : PAGE_TITLES.SERVER_ERROR

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export default ErrorPage
