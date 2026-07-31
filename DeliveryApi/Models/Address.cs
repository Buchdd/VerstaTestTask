using System;
using System.Collections.Generic;

namespace DeliveryApi.Models;

public partial class Address
{
    public ulong Id { get; set; }

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string House { get; set; } = null!;

    public string? Apartment { get; set; }

    public virtual ICollection<Order> OrderIdRecipientAddressNavigations { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderIdSenderAddressNavigations { get; set; } = new List<Order>();
}
