// @flow

import { useTranslation } from 'i18n'

const Spinner = () => {
  const [t] = useTranslation()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25,
        width: '100%',
        alignItems: 'center'
      }}
    >
      <img src="/static/spinner.gif" alt={t(`image-alt:loading-indicator`)} />
    </div>
  )
}

export default Spinner
