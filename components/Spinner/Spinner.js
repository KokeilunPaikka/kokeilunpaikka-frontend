// @flow

import { useTranslation } from 'i18n'

const Spinner = ({ plain, ...rest }) => {
  const [t] = useTranslation()

  const styles = !plain ? {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  } : {}

  return (
    <div
      style={styles}
      {...rest
      }
    >
      <img src="/static/spinner.gif" alt={t(`image-alt:loading-indicator`)} />
    </div>
  )
}

export default Spinner
