
interface AddAddressFormProps {
  setDefaultAddressId: (id: number | null) => void;
  onBack: () => void;
}

export default function AddAddressForm({setDefaultAddressId, onBack}: AddAddressFormProps) {
  return (
      <h1>신규배송지 추가 컴포넌트</h1>
  )
}