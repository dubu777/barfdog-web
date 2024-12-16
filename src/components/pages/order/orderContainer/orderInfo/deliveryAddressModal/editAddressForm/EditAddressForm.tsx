import { AddressResponse } from "@/types"

interface EditAddressFormProps {
  address: AddressResponse;
  onBack: () => void;
}

export default function EditAddressForm({address, onBack}: EditAddressFormProps) {
  return (
    <>수정</>
  )
}