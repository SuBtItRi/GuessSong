// import { Navigate, useLocation } from 'react-router-dom'
// import { ReactNode } from 'react'

// interface RequireAuthProps {
//   children: ReactNode
// }

// export const RequireAuth = ({ children }: RequireAuthProps) => {
//   const location = useLocation()

//   if (!auth) {
//     return (
//       <Navigate
//         to={RoutePath.login}
//         state={{ from: location }}
//         replace
//       />
//     )
//   }

//   return <>{children}</>
// }