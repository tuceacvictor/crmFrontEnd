export const prepareDataToCreate = (customer, device, otherInformation) => {
    let customerPhone = customer.phone ? customer.phone.value : undefined;
    let serial = device.serial ? device.serial.value : undefined;
    return {
        customer: {
            ...customer,
            phone: customerPhone,
        },
        device: {
            ...device,
            serial,
        },
        otherInformation: {
            ...otherInformation,
            managerId: otherInformation.manager ? otherInformation.manager.value : undefined,
            executorId: otherInformation.executor ? otherInformation.executor.value : undefined
        }
    }
};