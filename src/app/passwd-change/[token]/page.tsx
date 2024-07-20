import { PrivateRoute } from '@/components/PrivateRoute/PrivateRoute'
import { PasswdChange } from '@/components/PasswdChange/PasswdChange'

export default function PrivatePasswdChange() {
  return (
    <PrivateRoute>
      <PasswdChange />
    </PrivateRoute>
  )
}
