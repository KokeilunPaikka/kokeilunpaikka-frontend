// @flow

const steps = [
  <g fill="#D1D1D1">
    <path d="M163.5 98.5H233c.6 0 1 .4 1 1V166a67.5 67.5 0 01-67.5 67.5H97a1 1 0 01-1-1V166a67.5 67.5 0 0167.5-67.5z" />
    <path d="M164.5 0a164.5 164.5 0 110 329 164.5 164.5 0 010-329zm-.5 26a139 139 0 100 278 139 139 0 000-278z" />
  </g>,
  <g fill="none">
    <path
      d="M163.5 98.5H233c.6 0 1 .4 1 1V166a67.5 67.5 0 01-67.5 67.5H97a1 1 0 01-1-1V166a67.5 67.5 0 0167.5-67.5z"
      fill="#D7C3DC"
    />
    <path
      d="M164.5 1a164.5 164.5 0 110 329 164.5 164.5 0 010-329zm-.5 26a139 139 0 100 278 139 139 0 000-278z"
      fill="#D1D1D1"
    />
    <path
      d="M296.4 240.5a151.8 151.8 0 00-131.9-227"
      stroke="#D7C3DC"
      strokeWidth="26"
      strokeLinecap="round"
    />
    <text
      fontFamily="AvenirLTStd-Black, Avenir LT Std"
      fontSize="78"
      fontWeight="700"
      fill="#FFF"
    >
      <tspan x="141.4" y="192">
        1
      </tspan>
    </text>
  </g>,
  <g fill="none">
    <path
      d="M163.5 98.5H233c.6 0 1 .4 1 1V166a67.5 67.5 0 01-67.5 67.5H97a1 1 0 01-1-1V166a67.5 67.5 0 0167.5-67.5z"
      fill="#B4B4D7"
    />
    <path
      d="M164.5 1a164.5 164.5 0 110 329 164.5 164.5 0 010-329zm-.5 26a139 139 0 100 278 139 139 0 000-278z"
      fill="#D1D1D1"
    />
    <path
      d="M33.3 242.7a151.8 151.8 0 00262.5-.7M296.4 240.5a151.8 151.8 0 00-131.9-227"
      stroke="#B4B4D7"
      strokeWidth="26"
      strokeLinecap="round"
    />
    <text
      fontFamily="AvenirLTStd-Black, Avenir LT Std"
      fontSize="78"
      fontWeight="700"
      fill="#FFF"
    >
      <tspan x="141.4" y="192">
        2
      </tspan>
    </text>
  </g>,
  <g fill="none">
    <path
      d="M163.5 97.5H233c.6 0 1 .4 1 1V165a67.5 67.5 0 01-67.5 67.5H97a1 1 0 01-1-1V165a67.5 67.5 0 0167.5-67.5z"
      fill="#2D3264"
    />
    <path
      d="M164.5 0a164.5 164.5 0 110 329 164.5 164.5 0 010-329zm-.5 26a139 139 0 100 278 139 139 0 000-278z"
      fill="#2D3264"
    />
    <text
      fontFamily="AvenirLTStd-Black, Avenir LT Std"
      fontSize="78"
      fontWeight="700"
      fill="#FFF"
    >
      <tspan x="141.4" y="192">
        3
      </tspan>
    </text>
  </g>,
  <g fill="#73BE9B">
    <path d="M163.5 97.5H233c.6 0 1 .4 1 1V165a67.5 67.5 0 01-67.5 67.5H97a1 1 0 01-1-1V165a67.5 67.5 0 0167.5-67.5z" />
    <path d="M164.5 0a164.5 164.5 0 110 329 164.5 164.5 0 010-329zm-.5 26a139 139 0 100 278 139 139 0 000-278z" />
  </g>
]

const LeafCircle = ({ step }) => {
  return (
    <div>
      <svg width="329" height="329">
        {steps[step]}
      </svg>
    </div>
  )
}

export default LeafCircle
