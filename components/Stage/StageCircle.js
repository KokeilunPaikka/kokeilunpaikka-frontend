// @flow

const Stage = ({ step, active }) => {
  switch (step) {
    case 1:
      return (
        <g>
          <circle
            id="Oval"
            stroke="#E0E0E0"
            strokeWidth="8"
            cx="30"
            cy="30"
            r="27"
          />
          <path
            d="M63.6668971,13.308805 C59.7172902,11.0401528 55.1387224,9.74284715 50.2571527,9.74284715 C35.3664378,9.74284715 23.2951283,21.8141571 23.2951283,36.7048725"
            id="Oval"
            stroke={active ? '#D7C3DC' : '#AEAEAE'}
            strokeWidth="8"
            strokeLinecap="round"
            transform="translate(43.481013, 23.223860) rotate(-270.000000) translate(-43.481013, -23.223860) "
          />
        </g>
      )

    case 2:
      return (
        <g>
          <circle strokeWidth="8" stroke="#E0E0E0" cx="30" cy="30" r="27" />
          <path
            strokeWidth="8"
            strokeLinecap="round"
            d="M6.702 43.579C11.377 51.584 20.06 56.962 30 56.962c14.89 0 26.962-12.071 26.962-26.962C56.962 15.11 44.891 3.038 30 3.038"
            stroke={active ? '#B4B4D7' : '#AEAEAE'}
          />
        </g>
      )

    case 3:
      return (
        <circle
          strokeWidth="8"
          stroke={active ? '#09195B' : '#AEAEAE'}
          cx="30"
          cy="30"
          r="27"
        />
      )

    default:
      return null
  }
}

const Circle = ({
  stage,
  style,
  active = true
}: {
  stage: number,
  style: Array<Object>,
  active: boolean
}) => {
  return (
    <div style={style}>
      <svg width="62" height="62">
        <g fill="none">
          <g transform="translate(1 1)">
            <path d="M0 0h60v60H0z" />
            <Stage step={stage} active={active} />
            <text fontSize="34" fontWeight="600" fill="#4A4A4A">
              <tspan x="20" y="40">
                {stage}
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Circle
