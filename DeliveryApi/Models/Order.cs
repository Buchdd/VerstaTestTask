using System;
using System.Collections.Generic;

namespace DeliveryApi.Models;

public partial class Order
{
    public ulong Id { get; set; }

    public ulong IdSenderAddress { get; set; }

    public ulong IdRecipientAddress { get; set; }

    public ulong IdCargo { get; set; }

    public DateOnly DatePickup { get; set; }

    public virtual Cargo IdCargoNavigation { get; set; } = null!;

    public virtual Address IdRecipientAddressNavigation { get; set; } = null!;

    public virtual Address IdSenderAddressNavigation { get; set; } = null!;
}
