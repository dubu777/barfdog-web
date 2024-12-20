import { AddressResponse } from "@/types"

interface EditAddressFormProps {
  address: AddressResponse;
  onBack: () => void;
}

export default function EditAddressForm({address, onBack}: EditAddressFormProps) {
  console.log('address', address);
  
  return (
    <h1>배송지 수정 컴포넌트</h1>
  )
}