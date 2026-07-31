using System;
using System.Collections.Generic;

namespace DeliveryApi.Models;

public partial class Cargo
{
    public ulong Id { get; set; }

    public int Weight { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
